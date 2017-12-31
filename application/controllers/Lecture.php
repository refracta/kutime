<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lecture extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$vars = array(
			'nav_title' => '시간표 조회',
		);

		$this->load->view('lecture/index', $vars);
	}
}
