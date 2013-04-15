require 'sinatra'
require 'haml'
require 'json'


helpers do

  def get_metrics()
    @METRICS ||= JSON.parse(File.read("data/data.json"))
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

@@ overview
!!! 5
%html
  %head
    %link(rel="stylesheet" type="text/css" href="style.css")
    %script{:type => "text/javascript", :src  => "jquery-1.9.1.min.js"}
    %script{:type => "text/javascript", :src  => "d3.v3.min.js"}
    %script{:type => "text/javascript", :src  => "data.js"}
    %script{:type => "text/javascript", :src  => "draw.js"}
  %h1 Class Polymetric View
  %p Showing metrics for #{get_metrics.count} classes.
