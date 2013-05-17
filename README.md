# Class Polymetrics

## Data acquisition with Checkstyle

To get the metrics for a Java project first run [Checkstyle](http://checkstyle.sourceforge.net/) using the configuration defined in _metrics.xml_, e.g.

    java -jar checkstyle-all-4.1.jar -r "~/myproject/src/java" -c metrics.xml  \
      -f xml -o checkstyle_out.xml
		
Then convert the Checkstyle output to JSON and store it in the _data_ directory. Note that without specific configuration Checkstyle will record the full paths for the files but we normally want to start at the directory containing the top-level package. For that reason the Ruby script has a "basedir" option that specifies a prefix to be removed from the paths. Normally that is the same as the argument given to the source directory option in Checkstyle, e.g.

    ruby checkstyle2json.rb -b "~/myproject/src/java" -o ../data/data.json checkstyle_out.xml


## Displaying the polymetric views

After making sure that a file containing the metrics exists in JSON format in `data/data.json`, start the webserver as follows:

    ruby server.rb 

If you get an error about the HAML and/or Sinatra Ruby gems missing:

    gem install haml
    gem install sinatra

After that open a webbrowser at [http://localhost:4567](http://localhost:4567). The port number may vary depending on your Sinatra configuration.


## Copyright and license

Copyright 2013 Erik Doernenburg

Licensed under the Apache License, Version 2.0 (the "License");
you may not use these files except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
