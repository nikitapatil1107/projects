package com.cybage.boot;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;

import com.cybage.boot.dto.RegisterUserDTO;
import com.cybage.boot.models.UserProfileModel;
import com.cybage.boot.repository.UserRepository;
import com.cybage.boot.services.UserService;

@SpringBootTest
@ContextConfiguration(classes = {JobQuestRestBackendApplication.class})
class JobQuestRestBackendApplicationTests {
	
	@Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private UserService userService;
    
    @Test
	void contextLoads() {
	}

    @Test
    void testRegisterUserData_ValidDTO_UserDoesNotExist() {
        RegisterUserDTO registerUserDto = new RegisterUserDTO();
        registerUserDto.setUserName("John Doe");
        registerUserDto.setUserEmail("john@example.com");
        registerUserDto.setUserPassword("password");
        registerUserDto.setUserContactNo("1234567890");

        UserProfileModel userProfileModel = new UserProfileModel();
        userProfileModel.setUserName(registerUserDto.getUserName());
        userProfileModel.setUserEmail(registerUserDto.getUserEmail());
        userProfileModel.setUserPassword(registerUserDto.getUserPassword());
        userProfileModel.setUserContactNo(registerUserDto.getUserContactNo());

        when(userRepository.existsByUserEmail(anyString())).thenReturn(false);
        when(modelMapper.map(eq(registerUserDto), eq(UserProfileModel.class))).thenReturn(userProfileModel);
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword");
        when(userRepository.save(any(UserProfileModel.class))).thenReturn(userProfileModel);

        ResponseEntity<?> responseEntity = userService.registerUserData(registerUserDto);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        verify(userRepository, times(1)).existsByUserEmail("john@example.com");
        verify(modelMapper, times(1)).map(registerUserDto, UserProfileModel.class);
        verify(passwordEncoder, times(1)).encode("password");
        verify(userRepository, times(1)).save(userProfileModel);
    }
    
    @Test
    void testRegisterUserData_InvalidDTO() {
        RegisterUserDTO registerUserDto = new RegisterUserDTO(); 

        ResponseEntity<?> responseEntity = userService.registerUserData(registerUserDto);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Invalid Credentials", responseEntity.getBody());
        verifyNoInteractions(userRepository);
        verifyNoInteractions(passwordEncoder);
        verifyNoInteractions(modelMapper);
    }
    
    @Test
    void testAuthenticateUser_ValidCredentials() {
        // Arrange
        String userEmail = "mathematicswroteus@gmail.com";
        String userPassword = "password"; // This is the raw password

        // Creating a UserProfileModel with the provided email and hashed password
        UserProfileModel userProfileModel = new UserProfileModel();
        userProfileModel.setUserEmail(userEmail);
        userProfileModel.setUserPassword("$2a$10$EcNCQPzJlYVk4/twhsb0e..ZBzctKwHVHAg7rlIzQDUWj3m5lUtSq"); // This is the provided hashed password

        // Mocking userRepository to return the userProfileModel
        when(userRepository.findByUserEmail(anyString())).thenReturn(userProfileModel);

        // Mocking passwordEncoder to return true when matches is called with userPassword and the provided hashed password
        when(passwordEncoder.matches(eq(userPassword), eq("$2a$10$EcNCQPzJlYVk4/twhsb0e..ZBzctKwHVHAg7rlIzQDUWj3m5lUtSq")))
                .thenReturn(true);

        // Mocking modelMapper to return a RegisterUserDTO
        when(modelMapper.map(eq(userProfileModel), eq(RegisterUserDTO.class))).thenReturn(new RegisterUserDTO());

        // Act
        RegisterUserDTO authenticatedUser = userService.authenticateUser(userEmail, userPassword);

        // Assert
        assertNotNull(authenticatedUser);
        verify(userRepository, times(1)).findByUserEmail(userEmail);
        verify(passwordEncoder, times(2)).matches(eq(userPassword), eq("$2a$10$EcNCQPzJlYVk4/twhsb0e..ZBzctKwHVHAg7rlIzQDUWj3m5lUtSq"));
        verify(modelMapper, times(1)).map(userProfileModel, RegisterUserDTO.class);
    }
    
    @Test
    void testAuthenticateUser_InvalidCredentials() {
        // Arrange
        String userEmail = "mathematicswroteus@gmail.com";
        String userPassword = "invalid_password"; // This is an invalid password

        // Mocking userRepository to return a non-null UserProfileModel when findByUserEmail is called with userEmail
        when(userRepository.findByUserEmail(anyString())).thenReturn(new UserProfileModel());

        // Act
        RegisterUserDTO authenticatedUser = userService.authenticateUser(userEmail, userPassword);

        // Assert
        assertNull(authenticatedUser); // Expecting null since the user does not exist
        verify(userRepository, times(1)).findByUserEmail(userEmail);
        verify(passwordEncoder, never()).matches(eq(userPassword), anyString());
        verify(modelMapper, never()).map(any(), eq(RegisterUserDTO.class));
    }
    
    @Test
    void testUserExists_UserExists() {
        // Arrange
        String userEmail = "example@example.com";
        
        // Mocking userRepository to return true when existsByUserEmail is called with userEmail
        when(userRepository.existsByUserEmail(userEmail)).thenReturn(true);

        // Act
        boolean result = userService.userExists(userEmail);

        // Assert
        assertTrue(result);
        verify(userRepository, times(1)).existsByUserEmail(userEmail);
    }
    
    @Test
    void testUserExists_UserDoesNotExist() {
        // Arrange
        String userEmail = "example@example.com";
        
        // Mocking userRepository to return false when existsByUserEmail is called with userEmail
        when(userRepository.existsByUserEmail(userEmail)).thenReturn(false);

        // Act
        boolean result = userService.userExists(userEmail);

        // Assert
        assertFalse(result);
        verify(userRepository, times(1)).existsByUserEmail(userEmail);
    }
}
