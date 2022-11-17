package com.snacks.demo.Auth;

import static org.assertj.core.api.Assertions.assertThat;

import com.snacks.demo.dto.UserDto;
import com.snacks.demo.service.AuthService;
import java.util.stream.Stream;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class LoginTest {

  @Autowired
  AuthService authService;
  final static String VALID_EMAIL = "test@test.com";
  final static String VALID_PASSWORD = "1234";

  static Stream<Arguments> loginServiceProvider() throws Throwable {
    return Stream.of(
        Arguments.arguments(VALID_EMAIL, VALID_PASSWORD, "로그인 성공", true),
        Arguments.arguments("fake@test.com", "1234", "없는 이메일", false),
        Arguments.arguments("test@test.com", "0000", "비밀번호 다름", false)
    );
  }

  // service 테스트
  @ParameterizedTest(name = "{index} : {2}")
  @DisplayName("Login Service 테스트")
  @MethodSource("loginServiceProvider")
  void loginService(String email, String password, String message, boolean expected) {
    //given
    UserDto userDto2 = new UserDto(VALID_EMAIL, VALID_PASSWORD);
    authService.signUp(userDto2);

    UserDto userDto = new UserDto(email, password);

    //when

    ResponseEntity responseEntity = authService.login(userDto);
    //then
    if (expected == true) {
      assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    else {
      assertThat(responseEntity.getStatusCode()).isNotEqualTo(HttpStatus.OK);
    }
  }

}
