<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	protected $intime_data;

	public function __construct()
	{
		parent::__construct();

		$this->intime_data = json_decode(file_get_contents('/data/intime/exported.json'), TRUE);
		$this->output->set_content_type('application/json', 'utf-8');
	}

	public function departments()
	{
		$allowed_methods = array('GET');

		header('Access-Control-Allow-Methods: ' . implode(', ', $allowed_methods));

		if ( ! in_array($this->input->server('REQUEST_METHOD'), $allowed_methods))
		{
			show_error('Request method is not supported.', 405, '405 Method Not Allowed');
		}

		foreach ($this->intime_data['department'] as &$data)
		{
			unset($data['lect_code_list']);
		}
		unset($data);

		echo json_encode($this->intime_data['department']);
	}

	public function others()
	{
		$allowed_methods = array('GET');

		header('Access-Control-Allow-Methods: ' . implode(', ', $allowed_methods));

		if ( ! in_array($this->input->server('REQUEST_METHOD'), $allowed_methods))
		{
			show_error('Request method is not supported.', 405, '405 Method Not Allowed');
		}

		foreach ($this->intime_data['additional'] as &$data)
		{
			unset($data['lect_code_list']);
		}
		unset($data);

		echo json_encode($this->intime_data['additional']);
	}
}
