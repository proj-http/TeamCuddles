<?php

// http://backend.deviantart.com/rss.xml?q=gallery:orpheelin

$username = htmlspecialchars($_GET['username']);

if ($username == '')
	display_error("No username entered");

$json = array('error' => '');


$url = "http://backend.deviantart.com/rss.xml?q=gallery:{$username}";

$rss =  simplexml_load_file($url);

foreach ($rss->channel->item as $item) {
$media = $item->children('http://search.yahoo.com/mrss/');
	$t = (array)$item->title[0]->{0};
	$s = (array)$media->content[0]->attributes()->url[0]->{0};
	$json['photos'][] = array(

				'title'		=>		$t[0],
				'src'		=>		$s[0],
	
							  );

} 

echo json_encode($json);
die();

function display_error($error)
{
	$array = array('error' => $error);
	echo json_encode($array);
	die();
}

function customError($errno, $errstr)
  {
  display_error( "No photos found");

  die();
  }
  
  


/* EOF */