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
				if ($mime_type === FALSE)
				{
					$mime_type = mime_content_type($file_path);
				}
				$hash = hash_file('sha1', $file_path);

				$this->output->set_header('Cache-Control: public, max-age=604800');
				$this->output->set_header('ETag: "' . $hash . '"');
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
