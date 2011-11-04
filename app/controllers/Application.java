package controllers;

import play.*;
import play.mvc.*;
import views.html.*;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.jdesktop.swingx.graphics.GraphicsUtilities;
import org.jdesktop.swingx.graphics.ReflectionRenderer;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render());
    }

 	public static Result review() {
     	return ok(review.render());
    }

    public static Result paid() {
      	return ok(paid.render());
    }

    public static Result newForm() {
      //val form = new Form()
      //val months = form.period.split(",")
      return ok(newForm.render());
    }

	// This should be a File
	public static Result addPicture(String picture) throws IOException {
		
		// TODO: db
        // ByteArrayOutputStream os = new ByteArrayOutputStream();
        //         renderThumbnail(picture, os, 64);
        //         String thumbnail = "/data/" + picture.getName() + ".png";
        //         IOUtils.write(os.toByteArray(), new FileOutputStream(Play.getFile(thumbnail)));
        //         os = new ByteArrayOutputStream();
        // 
        //         renderImage(picture, os, 120);
        //         String reflection = "/data/" + picture.getName() + "-reflection.png";
        //         IOUtils.write(os.toByteArray(), new FileOutputStream(Play.getFile(reflection)));
        Logger.info(picture);
        return ok("reflection");
    }

	// protected static void renderImage(final File file, final OutputStream out, int height) throws IOException {
	//         FileInputStream is = new FileInputStream(file);
	// 
	//         BufferedImage src = ImageIO.read(is);
	//         if (src.getHeight() <= height) {
	//             height = src.getHeight() - 1;
	//         }
	//         BufferedImage thumb = GraphicsUtilities.createThumbnail(src, height);
	// 
	//         ReflectionRenderer reflectionRenderer = new ReflectionRenderer();
	//         BufferedImage reflection = reflectionRenderer.appendReflection(thumb);
	//         reflection.flush();
	//         ImageIO.write(reflection, "png", out);
	//     }
	// 
	//     protected static void renderThumbnail(final File file, final OutputStream out, int height) throws IOException {
	//         FileInputStream is = new FileInputStream(file);
	// 
	//         BufferedImage src = ImageIO.read(is);
	//          if (src.getHeight() <= height) {
	//             height = src.getHeight() - 1;
	//         }
	//         BufferedImage thumb = GraphicsUtilities.createThumbnail(src, height);
	// 
	//         ImageIO.write(thumb, "png", out);
	//     }

    

}
            