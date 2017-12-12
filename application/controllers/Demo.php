<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Demo extends CI_Controller {

	public function index()
	{
		$intime_data = json_decode(file_get_contents('/data/intime/exported.json'), TRUE);

		$data = array(
			'lecture_list' => $intime_data['lecture']['list'],
			'dept_name' => $intime_data['department'][0]['name'],
			'lect_code_list' => $intime_data['department'][0]['lect_code_list'],
		);

		$this->load->view('demo/index', $data);
	}
}
