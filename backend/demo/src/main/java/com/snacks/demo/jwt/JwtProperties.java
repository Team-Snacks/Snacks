package com.snacks.demo.jwt;

public interface JwtProperties {

  String SECRET = "NDJzZW91bC1zbmFja3MtYmFja2VuZC1kYXNoYm9hcmQtZGFzaGJvcmQtYmFja2VuZC1zbmFja3MtNDJzZW91bA==";
  int EXPIRATION_TIME = 864000000;
  String TOKEN_PREFIX = "Bearer ";
  String HEADER_STRING = "Authorization";
}
