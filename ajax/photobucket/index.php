<?php

$username = htmlspecialchars($_GET['username']);

if ($username == '')
	display_error("No username entered");
	
	


	
function display_error($error)
{
	$array = array('error' => $error);
	echo json_encode($array);
	die();
}