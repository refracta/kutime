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

	public function categories()
	{
		$allowed_methods = array('GET');

		header('Access-Control-Allow-Methods: ' . implode(', ', $allowed_methods));

		if ( ! in_array($this->input->server('REQUEST_METHOD'), $allowed_methods))
		{
			show_error('Request method is not supported.', 405, '405 Method Not Allowed');
		}

		$response_data = array();

		foreach ($this->intime_data['department'] as &$data)
		{
			unset($data['lect_code_list']);
		}
		unset($data);

		foreach ($this->intime_data['additional'] as &$data)
		{
			unset($data['lect_code_list']);
		}
		unset($data);

		$response_data['departments'] = $this->intime_data['department'];
		$response_data['others'] = $this->intime_data['additional'];

		echo json_encode($response_data);
	}

	public function lectures($code)
	{
		$allowed_methods = array('GET');

		header('Access-Control-Allow-Methods: ' . implode(', ', $allowed_methods));

		if ( ! in_array($this->input->server('REQUEST_METHOD'), $allowed_methods))
		{
			show_error('Request method is not supported.', 405, '405 Method Not Allowed');
		}

		$response_data = array();

		foreach ($this->intime_data['department'] as $data)
		{
			if ($data['code'] === $code)
			{
				$response_data = $data;
				break;
			}
		}

		if (empty($response_data))
		{
			foreach ($this->intime_data['additional'] as $data)
			{
				if ($data['code'] === $code)
				{
					$response_data = $data;
					break;
				}
			}
		}

		if (empty($response_data))
		{
			show_404();
		}

		$response_data['lectures'] = array();

		foreach ($response_data['lect_code_list'] as $lect_code)
		{
			$response_data['lectures'][] = $this->intime_data['lecture']['list'][$lect_code];
		}
		unset($response_data['lect_code_list']);

		echo json_encode($response_data);
	}

	public function candidates()
	{
		$allowed_methods = array('GET');

		header('Access-Control-Allow-Methods: ' . implode(', ', $allowed_methods));

		if ( ! in_array($this->input->server('REQUEST_METHOD'), $allowed_methods))
		{
			show_error('Request method is not supported.', 405, '405 Method Not Allowed');
		}

		$starred_codes = $this->input->get('codes');
		$starred_list = json_decode($starred_codes, TRUE);

		if ($starred_list === NULL)
		{
			show_error('Server cannot or will not process the request.', 400, '400 Bad Request');
		}

		$response_data = array(
			'code' => __FUNCTION__,
			'name' => '수강 예정 리스트',
			'lectures' => array(),
		);

		foreach ($starred_list as $lect_code)
		{
			if ( ! isset($this->intime_data['lecture']['list'][$lect_code]))
			{
				show_404();
			}

			$response_data['lectures'][] = $this->intime_data['lecture']['list'][$lect_code];
		}

		echo json_encode($response_data);
	}
}
