package com.plover.service;

import java.util.UUID;

import javax.transaction.Transactional;

import com.plover.config.UserRole;
import com.plover.model.user.Salt;
import com.plover.model.user.Users;
import com.plover.model.user.request.SignupRequest;
import com.plover.repository.SaltRepository;
import com.plover.repository.UserRepository;
import com.plover.utils.RedisUtil;
import com.plover.utils.SaltUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

@Service
public class AccountService {
	final String REDIS_CHANGE_PASSWORD_PREFIX="CPW";
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
    private SaltRepository saltRepository;
	
	@Autowired
    private SaltUtil saltUtil;
	
	@Autowired
    private RedisUtil redisUtil;

	 //이메일 인증에서 사용할 메서드
	 Users getUserByEmail(String email) {
		return null;
	 }
	 
	 //로그인 메서드
	 public Users login(String email, String password) throws Exception{
		Users user = findUserByEmail(email);
		
		//user정보가 없음
		if(user==null) { 
			throw new Exception("회원정보 없음");
		}
			
		String salt = user.getSalt().getSalt();
		password = saltUtil.encodePassword(salt,password);
		
		//비밀번호 틀림
		if(!user.getPassword().equals(password)) {
			throw new Exception("비밀번호 틀림");
		} 
		return user;
	 }
	 
	 //회원가입 요청 
	 @Transactional
	public boolean signup(SignupRequest request) {
		//이메일 중복 검사
			if(existsByEmail(request.getEmail())) {
				return false; 
			}
			//닉네임 중복 검사
			if(existsByNickName(request.getNickName())){
				return false;
			}
		
		 String password = request.getPassword();
		 String salt = saltUtil.genSalt();
		
		 Users user = Users.builder()
				 .email(request.getEmail())
				 .nickName(request.getNickName())
				 .campus(request.getCampus())
				 .generation(request.getGeneration())
				 .build();

		 if(request.getProfileImageUrl()!="" && request.getProfileImageUrl()!=null){
			user.setProfileImageUrl(request.getProfileImageUrl());
		 }
		 else{
		 	user.setProfileImageUrl("images/default-image.png");
		 }

		 user.setSalt(new Salt(salt));
		 user.setPassword(saltUtil.encodePassword(salt, password));
		 userRepository.save(user);
		 return true;
	}
	//이메일 중복 검사
	public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	//닉네임 중복 검사
    public boolean existsByNickName(String nickName) {
    	return userRepository.existsByNickName(nickName);
    }
    
    public Users findUserByEmail(String email) throws NotFoundException {
        Users user = userRepository.findUserByEmail(email);
        if(user == null) throw new NotFoundException("유저가 조회되지 않음");
        return user;
    }
    
    public void verifyEmail(String key) throws NotFoundException {
        String email = redisUtil.getData(key);
        Users user = userRepository.findUserByEmail(email);
        if(user==null) throw new NotFoundException("멤버가 조회되지않음");
        modifyUserRole(user, UserRole.ROLE_USER);
        redisUtil.deleteData(key);
    }
    
    public void sendVerificationMail(Users user) throws NotFoundException {
        String VERIFICATION_LINK = "https://dev.plover.co.kr/ssafy/account/verify/";
        if(user==null) throw new NotFoundException("멤버가 조회되지 않음");
        UUID uuid = UUID.randomUUID();
        redisUtil.setDataExpire(uuid.toString(),user.getEmail(), 60 * 30L);
        emailService.sendMail(user.getEmail(),"[PLOVER] 회원가입 인증메일입니다.",VERIFICATION_LINK+uuid.toString());
    }

    public void modifyUserRole(Users user, UserRole userRole){
            user.setRole(userRole);
            userRepository.save(user);
    }

    public boolean isPasswordUuidValidate(String key){
        String userId = redisUtil.getData(key);
        return !userId.equals("");
    }

    public void changePassword(Users user, String password) throws NotFoundException{
        if(user == null) throw new NotFoundException("changePassword(),멤버가 조회되지 않음");
        String salt = saltUtil.genSalt();
        user.setSalt(new Salt(salt));
        user.setPassword(saltUtil.encodePassword(salt,password));
        userRepository.save(user);
    }


    public void requestChangePassword(Users user) throws NotFoundException{
        String CHANGE_PASSWORD_LINK = "https://dev.plover.co.kr/ssafy/account/password/";
        if(user == null) 
        	throw new NotFoundException("멤버가 조회되지 않음.");
        
        String key = REDIS_CHANGE_PASSWORD_PREFIX+UUID.randomUUID();
        
        redisUtil.setDataExpire(key,user.getEmail(),60 * 30L);
        emailService.sendMail(user.getEmail(),"[PLOVER] 사용자 비밀번호 안내 메일",CHANGE_PASSWORD_LINK+key);
    }
    
    public Users findUserByNickName(String nickName)throws NotFoundException {
    	 Users user = userRepository.findUserByNickName(nickName);
         if(user == null) throw new NotFoundException("유저가 조회되지 않음");
         return user;
    }

}
