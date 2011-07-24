<?php
$username = htmlspecialchars($_GET['username']);
set_error_handler("customError");
if ($username == '')
	display_error("No username entered");

$json = array('error' => '');


$url = "http://twitpic.com/photos/{$username}/feed.rss";

$dom = new DomDocument();
$dom->load($url);

$arr = array();

$titles = $dom->getElementsByTagName("description");
$i = 0;
foreach($titles as $node) {
   $html = $node->textContent;

	preg_match_all('/<img[^>]+>/i',$html, $result); 
	
	$result[0] = str_replace('<img src="','',$result[0]);
	$result[0] = str_replace('">','',$result[0]);
	
	$arr[$i] = array('src'=>$result[0][0]);
	$i++;
}

foreach ($arr as $t)
{
	if ($t['src'] != '')
	{
		$json['photos'][] = array(
		'title' =>	"",
		'src'	=>	$t['src'],
					);
	}
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
