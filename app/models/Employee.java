package models;

import java.util.*;
import javax.persistence.*;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;

import com.avaje.ebean.*;

@Entity 
public class Employee extends Model {

  	@Id
    public Long id;

    @Constraints.Required
    public String name;

	@Constraints.Required
	public String bankAccountNumber;

    //@Formats.Email
    public String emails;

    @Formats.DateTime(pattern="yyyy-MM-dd")
    public Date discontinued;

    @OneToMany
    public List<Form> forms;

    /**
     * Generic query helper for entity Employee with id Long
     */
    public static Finder<Long,Employee> find = new Finder(Long.class, Employee.class); 

}