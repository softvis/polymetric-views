require 'rubygems'
require 'nokogiri'
require 'json'
              
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

  def sizebucket()
    size_bucket = 0
    [50, 100, 200, 500, 1000, 2000].each do |i|
      size_bucket = i
      break if i > @wmc_loc
    end
    sizebucket
  end

  def to_hash    
    { 
      "FLENGTH" => @flength,
      "CDAC" => @cdac,
      "CFOC" => @cfoc,
      "MCOUNT" => @mcount,
      "LOC" => @wmc_loc,
      "WMC" => @wmc_cc,
      "istest" => @name.index('test/') != nil ? 'test' : 'main',
      "name" => @name.chomp(".java")
    }
  end
  
end

class Processor

  def initialize(infile, prefix, outfile)
    @doc = Nokogiri::XML(File.new(infile))
    @prefix = prefix
    @outfile = outfile
  end

  def run
    all_metrics = []
    @doc.xpath("//file").each do |filenode|    
      metrics = Metrics.new(filenode["name"].sub(@prefix, ""))
      filenode.xpath(".//error").each do |errnode| 
        metrics.add(errnode["source"], errnode["message"])
      end  
      all_metrics << metrics.to_hash
    end
    File.open(@outfile, 'w') { |f| f.write("#{all_metrics.to_json}") }
  end
  
end

Processor.new("data/checkstyle_out.xml", "trunk", "data/data.json").run
