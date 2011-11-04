import sbt._
import Keys._

object ApplicationBuild extends Build {

    val appName         = "expenses"
    val appVersion      = "0.1"

    val appDependencies = Seq(
	        "org.swinglabs" % "swingx" % "0.9.3",
			"commons-io" % "commons-io" % "2.1"
	    )

    val main = PlayProject(appName, appVersion, appDependencies)

}
            