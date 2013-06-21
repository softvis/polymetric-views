require 'sinatra'

get '/' do
  erb :index
end

get '/barchart' do
  erb :barchart
end

get '/hotspotdiagram' do
  erb :hotspotdiagram
end
