# Polymetric Views

## Getting the metrics data with inFamix

To get the metrics for a Java, C, or C++ project use [inFamix](http://www.intooitus.com/products/infamix). On Linux simply call inFamix like this

    inFamix -lang ( cpp | java | c ) -path path/to/project -mse path/to/msefile.mse

On OS X, depite the fact that inFamix is packaged like an application, it must also be used from the command line:

    ./inFamix.app/Contents/MacOS/inFamix -lang ( cpp | java | c ) -path path/to/project -mse path/to/msefile.mse

Copy the MSE file into the _public_ directory and rename it to **data.mse**.

MSE is a file format. The files generated by inFamix use the MSE format to write FAMIX models. Information about FAMIX and MSE can be found on the [Moose Technology]() website.


## Displaying the polymetric views

Open the file **public/polymetrics.html** in a browser. If a file named **data.mse** is present a diagram for the data contained in that file should be displayed in the browser. In either case, other MSE files can be loaded from the page. 

Note that depending on your browser and computer and the size of the MSE file it can take 10 seconds or more before the diagram is rendered. Switching between layouts and metrics mappings should be very quick.

Supported browsers: Firefox, WebKit/Blink-based browsers (e.g. Safari, Chrome), "modern" Internet Explorer (i.e. Internet Explore 9 and above). Other browsers may or may not work.


## Implementation Notes

### The MSE parser

The MSE parser in **public/mseparser.js** was generated with [PEG.js](http://pegjs.majda.cz/). The grammar is included in **mse/mse.pegjs**. If you want to modify the grammar and regenerate the parser, run the **generate.sh** script. You will need Node.js, npm, and the pegjs package  to do so. Detailed instructions are available in the [PEG.js documentation](http://pegjs.majda.cz/documentation).


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
