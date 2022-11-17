package com.snacks.demo.dto;

import com.snacks.demo.response.ResponseMessage;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  @NotBlank(message = ResponseMessage.EMAIL_NULL)
  @Email(message = ResponseMessage.EMAIL_FORMAT_ERROR)
  private String email;

  @NotBlank(message = ResponseMessage.PASSWORD_NULL)
  private String password;
}
