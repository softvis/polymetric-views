require 'nokogiri'
require 'json'
require 'optparse'
              
              
class Metrics
      
  def initialize(name)
      @name = name
      @flength = 0
      @cdac = 0
      @cfoc = 0
      @mcount = 0
      @wmc_loc = 0
      @wmc_cc = 0
  end

  def add(source, message)
    case source.split(/\./).last
      when "FileLengthCheck" 
        @flength = getval(message, 3)
      when "ClassDataAbstractionCouplingCheck" 
        @cdac = getval(message, 5)
      when "ClassFanOutComplexityCheck" 
        @cfoc = getval(message, 4)
      when "MethodLengthCheck" 
     	  @wmc_loc += getval(message, 3) 
      when "CyclomaticComplexityCheck" 
        @wmc_cc += getval(message, 3)
        @mcount += 1
    end
  end
     
  def getval(message, pos)
	  message.split(/ /)[pos].sub(/,/, "").to_i
  end
  
  def is_test
    @name.index('test/') != nil
  end

  def to_hash    
    { 
      "FLENGTH" => @flength,
      "CDAC" => @cdac,
      "CFOC" => @cfoc,
      "MCOUNT" => @mcount,
      "LOC" => @wmc_loc,
      "WMC" => @wmc_cc,
      "istest" => is_test() ? 'test' : 'main',
      "path" => @name,
      "name" => @name.split("/").last().chomp(".java")
    }
  end
  
end


class Processor

  def initialize(argv)
    parser = OptionParser.new do |opt|
      opt.banner = "Usage: #{$0} [OPTIONS] inputfile"
      @outfile = $stdout
      opt.on("-o", "--outfile FILENAME", "file to write the output to") do |outfile|
        @outfile = File.open(outfile, 'w')
      end
      @basedir = ""
      opt.on("-b", "--basedir PATH", "base directory to be removed from paths") do |basedir|
        @basedir = basedir
      end
      @compact = false
      opt.on("-c", "--compact", "create compact (one-line) output") do |basedir|
        @compact = true
      end
      @tests = false
      opt.on("-t", "--tests", "include test classes") do |basedir|
        @compact = true
      end
      opt.on("-h", "--help", "help") do 
        puts parser
        exit
      end
    end
    parser.parse!(argv)
    @doc = Nokogiri::XML((argv.length > 0) ? File.new(argv[0]) : $stdin)
  end

  def run
    all_metrics = []
    @doc.xpath("//file").each do |filenode|    
      metrics = Metrics.new(filenode["name"].sub(@basedir, ""))
      filenode.xpath(".//error").each do |errnode| 
        metrics.add(errnode["source"], errnode["message"])
      end
      all_metrics << metrics.to_hash unless metrics.is_test && !@tests
    end
    output = @compact ? all_metrics.to_json : JSON.pretty_generate(all_metrics)
    @outfile.write("#{output}")
  end
  
end

Processor.new(ARGV).run
