<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Intro extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$vars = array(
			'nav_title' => '인하대 시간표',
		);

		$this->load->view('intro/index', $vars);
	}
}
