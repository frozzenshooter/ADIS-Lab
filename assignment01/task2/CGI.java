import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.Map;
import java.util.Scanner;

/**
 * Website and File Logging both in one file
 */
public class CGI {

    public static void main(String[] args) {
        // Look up the logfile. It's the only file
        Scanner scanner = new Scanner(System.in);
        Path filepath = Paths.get(System.getProperty("user.home"), "html", "exercise1", "task2", "messages.txt");
        File logfile = new File(String.valueOf(filepath));

        // Check if POST request has been received.
        // Also check for new Lines --> Parameters,
        // so no empty requests get processed.
        if (args[0].equals("POST") && scanner.hasNextLine()) {
            logToFile(scanner, logfile);
        }

        //build website from file
        String html = buildHtml(logfile);
        System.out.println(html);

    }

    /**
     *
     * @param logfile LogFile with roaries
     * @return ALL the html
     */
    public static String buildHtml(File logfile){

        String header = "Content-type: text/html\n\n" +
                "<html>\n" +
                "<head>\n" +
                "<title>ADIS Roary</title>\n" +
                "<link rel=\"stylesheet\" href=\"../task2css/style.css\">\n" +
                "</head>\n";

        String title = "<body>\n" +
                "<h1>Roary<h1>\n";

        String inputForm = "<div id=\"new-roary\">\n" +
                "<div id=\"new-roary-header\">\n" +
                "<h2> New Post </h2>\n" +
                "</div>\n" +
                "<div>\n" +
                "<form method= \"POST\">\n" +
                "<label for=\"fname\">Name</label><br>\n" +
                "<input type=\"text\" id=\"fname\" name=\"fname\" value=\"\"><br>\n" +
                "<label for=\"fname\">Message</label><br>\n" +
                "<input type=\"text\" id=\"fmsg\" name=\"fmsg\" value=\"\"><br><br>\n" +
                "<input type=\"submit\" value=\"Submit\">\n"+
                "</form>\n" +
                "</div>\n" +
                "</div>\n";

        String roaries = buildRoaries(logfile);

        String end = "</body>\n" +
                "</html>\n";

        return header+title+inputForm+roaries+end;
    }

    /**
     * Build all roaries from logfile
     * @param logfile file with roaries
     * @return roaries in html format, ordered
     */
    public static String buildRoaries(File logfile) {
        try (FileReader fileReader = new FileReader(logfile)) {
            BufferedReader reader = new BufferedReader(fileReader);

            //Use stack for chronological order of all roaries
            //We assume that user wants to see newest roaries first
            //Deque could be used to make this configuriable
            LinkedList<String> stack = new LinkedList<>();

            String roar;

            while ((roar = reader.readLine()) != null){
                //parse log line
                String[] logs = roar.split(",");
                String attributeSeparator = "=";
                String username = logs[0].split(attributeSeparator)[1];
                String message = logs[1].split(attributeSeparator)[1];
                String date = logs[2].split(attributeSeparator)[1];

                String html = "<div class=\"roary-list-item\">\n"+
                        "<div class =\"roary-list-item-head\">\n"+
                        username +
                        "\n</div>\n" +
                        "<div class=\"roary-list-item-msg\">\n" +
                        message +
                        "\n</div>\n"+
                        "<div class=\"roary-list-item-date\">\n"+
                        date+
                        "\n</div>\n</div>\n";
                stack.push(html);
            }

            //append all messages into one with StringBuilder
            StringBuilder htmlBuilder = new StringBuilder();
            while (!stack.isEmpty() ){
                htmlBuilder.append(stack.pop());
            }

            return htmlBuilder.toString();

        } catch (IOException e) {
            System.err.println("Could not read posts from file.\nEither no file exists or you do not have the required" +
                    "permissions");
            return "";
        }
    }


    public static void logToFile(Scanner scanner, File logfile) {
        String message = buildLog(scanner);
        //If message is null it was too long, so nothing gets logged
        if (message == null) return;
        try (FileOutputStream fo = new FileOutputStream(logfile, true)) {
            fo.write(message.getBytes());
        } catch (IOException e) {
            System.err.println("Error while writing or opening file. Check permissions and task2.md");
        }
    }

    public static String buildLog(Scanner scanner) {
        //parse POST query
        String[] query = scanner.nextLine().split("&");
        String name = query[0].split("=")[1].replace('+', ' ');
        String message = query[1].split("=")[1].replace('+', ' ');
        //check for illegal messages
        if ((message.length() < 128) && (name.length() < 128)) {
            return "name=" + name + ", message=" + message + ", date=" + new java.util.Date().toString() + "\n";
        } else {
            return null;
        }
    }

}
