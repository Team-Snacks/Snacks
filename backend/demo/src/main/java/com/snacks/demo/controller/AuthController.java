package com.snacks.demo.controller;

import com.snacks.demo.dto.UserDto;
import com.snacks.demo.response.ResponseService;
import com.snacks.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  AuthService authService;

  @Autowired
  ResponseService responseService;

  @Autowired
  PasswordEncoder passwordEncoder;

  @PostMapping("")
  public ResponseEntity signUp(@Validated @RequestBody UserDto userDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest()
          .body(responseService.errorResponse(bindingResult.getFieldError().getDefaultMessage()));
    }
    return authService.signUp(userDto);
  }

  @PostMapping("/login")
  public ResponseEntity login(@Validated @RequestBody UserDto userDto,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest()
          .body(responseService.errorResponse(bindingResult.getFieldError().getDefaultMessage()));
    }
    return authService.login(userDto);
  }
}
