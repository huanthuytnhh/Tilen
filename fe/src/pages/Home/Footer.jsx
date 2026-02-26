import React from "react";
import {
  FacebookOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Row, Col } from "antd";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h4 className="text-lg font-bold mb-4">Follow Us</h4>
        <Row justify="center">
          <Col>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FacebookOutlined className="text-2xl hover:text-blue-600 transition-colors duration-300" />
            </a>
          </Col>
          <Col>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <GithubOutlined className="text-2xl hover:text-gray-400 transition-colors duration-300" />
            </a>
          </Col>
          <Col>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <TwitterOutlined className="text-2xl hover:text-blue-400 transition-colors duration-300" />
            </a>
          </Col>
          <Col>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <InstagramOutlined className="text-2xl hover:text-pink-500 transition-colors duration-300" />
            </a>
          </Col>
        </Row>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Your Game Name. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
