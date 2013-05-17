require 'sinatra'
require 'haml'
require 'json'

helpers do

  def get_metrics()
    @METRICS ||= JSON.parse(File.read("data/data.json"))
  end

end

get '/' do
  haml :index
end

get '/barchart' do
  haml :barchart
end

get '/hotspotdiagram' do
  haml :hotspotdiagram
end

get '/data' do
  content_type :json
  get_metrics().to_json
end

get '/data.js' do
  content_type "text/javascript"
  "var data = " + get_metrics().to_json
end
