<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Assets extends CI_Controller {

	public function __construct()
	{
		parent::__construct();

		$this->load->helper('file');
		$this->load->helper('url');
	}

	public function index()
	{
		$file_path = APPPATH . uri_string();

		if (file_exists($file_path))
		{
			if (is_file($file_path))
			{
				$file_name = basename($file_path);
				$mime_type = get_mime_by_extension($file_name);

				$this->output->set_content_type($mime_type, 'utf-8');
				$this->output->set_output(file_get_contents($file_path));
			}
			else
			{
				show_error('Directory access is forbidden.', 403, '403 Forbidden');
			}
		}
		else
		{
			show_404();
		}
	}
}
