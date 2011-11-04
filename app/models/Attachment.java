package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

import com.avaje.ebean.*;

@Entity 
public class Attachment extends Model {

  	@Id
    public Long id;

	public String descriptions;

	@Constraints.Required
	public String name;

    
    public byte[] content;

    /**
     * Generic query helper for entity Attachment with id Long
     */
    public static Finder<Long,Attachment> find = new Finder(Long.class, Attachment.class); 

}