import { useState } from "react";
import toast from "react-hot-toast";
const RegisterPage=({setAuth})=>{
      const toReg=()=>{
        const register=document.querySelector('.register');
        const login=document.querySelector('.login');
        login.classList.remove('open');
        register.classList.remove('close')
      }
      
      const toLogin=()=>{
        const register=document.querySelector('.register');
        const login=document.querySelector('.login');
        register.classList.add('close');
        login.classList.add('open')
      };
      
      //form inputs
      const pic=localStorage.getItem('pic')||'oo';
      const [username,setName]=useState('');
      const [email,setEmail]=useState('');
      const [password, setPassword]=useState('');

      //registerUser
      const handleSubmit1=async(e)=>{
        e.preventDefault()
        try {
          preloader()
          const url='https://project-api-version1.herokuapp.com/api/register';
          const response= await fetch(url,{
            method:'post',
            body:JSON.stringify({
            username:username,
            pic:pic,
            email:email,
            password:password 
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const parseRes=await response.json()
        if(parseRes.token){
          localStorage.setItem('pic',parseRes.pic);
          localStorage.setItem('token',parseRes.token);
          localStorage.setItem('name',parseRes.username);
          localStorage.setItem('email',parseRes.email);
          localStorage.setItem('id',parseRes._id);
          setAuth(true)
          preloaderoff()
          toast.success('success register')
        }else{
          setAuth(false)
          preloaderoff()
          toast.error(parseRes)
        }
        } catch (err) {
          toast.error('Try again')
          preloaderoff()
          console.log(err.message)
        }
      };

      //loginUser
      const handleSubmit2=async(e)=>{
        e.preventDefault()
        try {
          preloader();
          const url='https://project-api-version1.herokuapp.com/api/login'
          const response= await fetch(url,{
            method:'POST',
            body:JSON.stringify({
            email:email,
            password:password
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })
        const parseRes= await response.json()
        if(parseRes.token){
          localStorage.setItem('pic',parseRes.pic);
          localStorage.setItem('token',parseRes.token);
          localStorage.setItem('name',parseRes.username);
          localStorage.setItem('email',parseRes.email);
          localStorage.setItem('id',parseRes._id);
          setAuth(true)
          preloaderoff()
          toast.success('success login')
        }else{
          setAuth(false)
          preloaderoff();
          toast.error(parseRes)
        }
        } catch (err) {
          toast.error('User doesnt exist')
          preloaderoff()
          console.log(err.message)
        }
      }
       //preloader
       const preloader=()=>{
        const loader=document.querySelector('.preload');
        loader.style.display='block';
      }
      const preloaderoff=()=>{
        const loader=document.querySelector('.preload');
        loader.style.display='none';
      }

    return(
        <div>
           <div className="preload "></div>
            {/*register modal*/}
            <div className='register customfont'>
                <div className='registermodal container'>
                <h5 style={{borderBottom:'1px solid gray',width:'41%', margin:'0 auto', color:'rgb(226, 43, 165)'}}>register</h5> <br/>
                <p style={{fontSize:'20px'}}></p>
                <form onSubmit={handleSubmit1}>
                    <input type='text'  placeholder="Enter username" name='username' onChange={(e)=>{setName(e.target.value)}} required className="form-control my-3"/>
                    <input type='text' placeholder="Enter email" name="email" required onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-3"/>
                    <input type='password' placeholder="Enter password" name='password' onChange={(e)=>{setPassword(e.target.value)}}
                    required className="form-control my-3"/>
                    <button className="btn-small waves-effect waves-light left" type='submit' style={{marginTop:'40px', backgroundColor: 'rgb(226, 43, 165)'}}>Register</button>
                    <a onClick={toLogin} className="right" style={{cursor: 'pointer', marginTop: '10px'}}>I have an account!</a>
                    </form>
                </div>
            </div>
            
            {/*login modal */}
            <div className='login customfont'>
                <div className='loginmodal container'>
                <h5 style={{borderBottom:'1px solid gray',width:'41%', margin:'0 auto', color:'rgb(226, 43, 165)'}}>Login</h5> <br/>
                <p style={{fontSize:'20px'}}></p>
                <form onSubmit={handleSubmit2}>
                    <input type='text' placeholder="Enter email" name="email" required style={{height:'30px'}} onChange={(e)=>{setEmail(e.target.value)}} className="form-control my-3"/>
                    <input type='password' placeholder="Enter password" name='password' onChange={(e)=>{setPassword(e.target.value)}} className="form-control my-3"
                    required style={{height:'30px'}}/>
                    <button className="btn-small waves-effect waves-light left" type='submit' style={{marginTop:'40px', backgroundColor: 'rgb(226, 43, 165)'}}>Login</button>
                    <a onClick={toReg} className="right" style={{cursor: 'pointer', marginTop: '50px'}}>Register</a>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;