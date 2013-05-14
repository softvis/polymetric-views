# Class Polymetrics

## Data acquisition with Checkstyle

To get the metrics for a Java project first run [Checkstyle](http://checkstyle.sourceforge.net/) using the configuration defined in _metrics.xml_, e.g.

    java -jar checkstyle-all-4.1.jar -r "~/myproject/src/java" -c metrics.xml  \
      -f xml -o checkstyle_out.xml
		
Then convert the Checkstyle output to JSON and store it in the _data_ directory. Note that without specific configuration Checkstyle will record the full paths for the files but we normally want to start at the directory containing the top-level package. For that reason the Ruby script has a "basedir" option that specifies a prefix to be removed from the paths. Normally that is the same as the argument given to the source directory option in Checkstyle, e.g.

    ruby checkstyle2json.rb -b "~/myproject/src/java" -o ../data/data.json checkstyle_out.xml
