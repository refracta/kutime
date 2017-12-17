<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller {

	public function index()
	{
		$intime_data = json_decode(file_get_contents('/data/intime/exported.json'), TRUE);

		$vars = array(
			'nav_title' => $intime_data['department'][0]['name'],
			'lecture_list' => $intime_data['lecture']['list'],
			'lect_code_list' => $intime_data['department'][0]['lect_code_list'],
		);

		$this->load->view('demo/index', $vars);
	}
}
