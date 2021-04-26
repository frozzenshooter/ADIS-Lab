import java.util.Map;
import java.util.Scanner;
import java.io.FileOutputStream;
import java.io.File;
import java.io.FileNotFoundException;

public class CGI {
    public static void main(String[] args) throws FileNotFoundException {

	Scanner scanner = new Scanner(System.in);
        if (args[0].equals("POST") && scanner.hasNextLine()) {
            try {
                String post = scanner.nextLine();
                String name = post.split("&")[0].split("=")[1].replace('+', ' ');
                String message = post.split("&")[1].split("=")[1].replace('+', ' ');
                if (name.length() < 128 && message.length() < 128) {
                    String path2 = System.getProperty("user.home") + File.separator + "html" + File.separator + "exercise1" + File.separator + "task2" + File.separator + "messages.txt";
                    System.err.println(path2);
                    File file2 = new File(path2);
                    file2.createNewFile();
                    FileOutputStream fo = new FileOutputStream(file2, true);
                    String log = "name=" + name + ", message=" + message + ", date=" + new java.util.Date().toString() + "\n";
                    fo.write(log.getBytes());
                } else {
                    System.exit(1);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        // Print static site content
        System.out.println("Content-type: text/html");
        System.out.println();
        System.out.println("<html>");
        System.out.println("<head>");
        System.out.println("<title>ADIS Roary</title>");
        System.out.println("<link rel=\"stylesheet\" href=\"../task2css/style.css\">");
        System.out.println("</head>");
        System.out.println("<body>");
        System.out.println("<h1>Roary<h1>");
        System.out.println("<div id=\"new-roary\">");
        System.out.println("<div id=\"new-roary-header\">");
        System.out.println("<h2> New Post </h2>");
        System.out.println("</div>");
        System.out.println("<div>");
        // Call CGI on form submit
        System.out.println("<form method= \"POST\">");
        System.out.println("<label for=\"fname\">Name</label><br>");
        System.out.println("<input type=\"text\" id=\"fname\" name=\"fname\" value=\"\"><br>");
        System.out.println("<label for=\"fname\">Message</label><br>");
        System.out.println("<input type=\"text\" id=\"fmsg\" name=\"fmsg\" value=\"\"><br><br>");
        System.out.println("<input type=\"submit\" value=\"Submit\">");
        System.out.println("</form>");
        System.out.println("</div>");
        System.out.println("</div>");

        //List Roars
        System.out.println("<div id=\"roary-list\">");
        String path = System.getProperty("user.home") + File.separator + "html" + File.separator + "exercise1" + File.separator + "task2" + File.separator + "messages.txt";

        File file = new File(path);
        if (file.exists()) {
            Scanner in = new Scanner(file);
            while (in.hasNext()) {
                String roar = in.nextLine();
                String username = roar.split(",")[0].split("=")[1];
                String message = roar.split(",")[1].split("=")[1];
                String date = roar.split(",")[2].split("=")[1];
                System.out.println("<div class=\"roary-list-item\">");
                System.out.println("<div class =\"roary-list-item-head\">");
                System.out.println(username);
                System.out.println("</div>");
                System.out.println("<div class=\"roary-list-item-msg\">");
                System.out.println(message);
                System.out.println("</div>");
                System.out.println("<div class=\"roary-list-item-date\">");
                System.out.println(date);
                System.out.println("</div>");
                System.out.println("</div>");
            }
        }
        System.out.println("</body>");
        System.out.println("</html>");
    }
}
