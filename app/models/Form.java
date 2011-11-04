package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

import com.avaje.ebean.*;

@Entity 
public class Form extends Model {

  	@Id
    public Long id;

	public String comments;
	@Formats.DateTime(pattern="yyyy-MM-dd")
	public Date createdDate;
	@Formats.DateTime(pattern="yyyy-MM-dd")
	public Date modifiedDate;
	public String period;

    @OneToMany
    public List<Item> items;

	@OneToMany
	public List<Attachment> attachments;

    /**
     * Generic query helper for entity Form with id Long
     */
    public static Finder<Long,Form> find = new Finder(Long.class, Form.class); 

}