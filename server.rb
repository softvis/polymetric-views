require 'sinatra'
require 'haml'
require 'json'

helpers do

  def get_metrics()
    if @METRICS == nil then
      @METRICS = []      
      header = nil
      File.readlines('metrics.csv').each do |line|
        elements = line.split(/\t/).map { |e| e.chomp }
        if header == nil then
          header = elements
        else
          elements = elements.map.with_index { |e, i| i <= 5 ? e.to_i : e}
          @METRICS << Hash[header.zip(elements)]
        end  
      end
    end
    @METRICS
  end

end

get '/' do
  redirect "/overview"
end

get '/overview' do
  haml :overview
end

get '/data' do
  content_type :json
  get_metrics().to_json
end

get '/data.js' do
  content_type "text/javascript"
  "var data = " + get_metrics().to_json
end


__END__

@@ cctray
!!! XML
%Projects
  %Project{:name => 'connectfour', :webUrl => 'http://localhost:4567/dashboard/build/detail/connectfour',
    :activity => @@ACTIVITY, :lastBuildStatus => @@STATUS,
    :lastBuildLabel => "build.#{@@BUILD_NUM}", :lastBuildTime => @@BUILD_TIME}


@@ overview
!!! 5
%html
  %head
    %script{:type => "text/javascript", :src  => "jquery-1.9.1.min.js"}
    %script{:type => "text/javascript", :src  => "d3.v3.min.js"}
    %script{:type => "text/javascript", :src  => "data.js"}
    %script{:type => "text/javascript", :src  => "draw.js"}
  %h1 Class Polymetric View
  %p Showing metrics for #{get_metrics.count} classes.
  %div
