<?php
error_reporting(E_NONE);
require "phpFlickr/phpFlickr.php";

$flickr = new phpFlickr("","");

$username = htmlspecialchars($_GET['username']);

if ($username == '')
	display_error("No username entered");

$json = array('error' => '');

$user = $flickr->people_findByUsername($username);
$d = $flickr->photos_search(array('user_id' => $user['nsid'], 'per_page' => 250));

if (! is_array($d['photo']) || count($d['photo']) == 0)
	display_error("No photos found");

	
foreach ($d['photo'] as $photo)
{
	$json['photos'][] = array(
		'title' =>	$photo['title'],
		'src'	=>	"http://farm{$photo['farm']}.static.flickr.com/{$photo['server']}/{$photo['id']}_{$photo['secret']}_b.jpg",
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

?>