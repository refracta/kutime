<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		if (ENVIRONMENT === 'production')
		{
			show_404();
		}

		$this->load->view('test/index');
	}
}
