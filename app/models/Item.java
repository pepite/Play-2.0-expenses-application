package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

import com.avaje.ebean.*;

@Entity 
public class Item extends Model {

  	@Id
    public Long id;

    @Constraints.Required
    public String name;
  
	@Formats.DateTime(pattern="yyyy-MM-dd")
	public Date datePaid;
  	@Constraints.Required
	public Double amount;
  	public Double tax;
  	public Double totalAmount;
  	public String description;

 	@ManyToOne
    public Form form;

  	public static Finder<Long,Item> find = new Finder(Long.class, Item.class); 

}