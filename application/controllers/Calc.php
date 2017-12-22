<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Calc extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$vars = array(
			'nav_title' => '경우의 수 계산',
		);

		$this->load->view('calc/index', $vars);
	}
}
