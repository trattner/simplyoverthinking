// TO DO 1 - add podcast buttons & RSS
// TO DO 2 - add waitlist db functionality
// TO DO 3 - deploy to production. 


// TO DO - modify template, get logo favicon, plug into a DB.
// TO DO - setup cname www. check redirects to home /

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS for API calls
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
  
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

    // API route for waitlist signup
    if (request.method === 'POST' && url.pathname === '/api/waitlist') {
        try {
          const { email } = await request.json();
          
          // Validate email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return new Response(JSON.stringify({ error: 'Invalid email' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
  
            // Get client IP
            const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    
            // Save to D1 database
            try {
                await env.DB.prepare(
                'INSERT INTO waitlist (email, ip_address) VALUES (?, ?)'
                ).bind(email, clientIP).run();
            } catch (dbError) {
                if (dbError.message.includes('UNIQUE constraint failed')) {
                return new Response(JSON.stringify({ error: 'Email already registered' }), {
                    status: 409,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
                }
                throw dbError;
            }
    
            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
  
        } catch (error) {
          console.error('Error:', error);
          return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
    }
  

    const logo = 'TBD';

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/png" href="data:image/png;base64,xxxxxxxxxxx">
        <title>Better Half Club</title>

        <!-- Google tag (gtag.js)  TO DO -->
         

        <!-- MSFT Clarity heatmaps  TO DO  -->
  

        <!-- Crimson Pro Google Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
        

        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; */
                font-family: "Crimson Pro", Georgia, "Times New Roman", Roboto, Helvetica, serif;
                background-color: #F7F3ED;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            
            .container {
                background-color: #F7F3ED;
                max-width: 750px;
                width: 100%;
                padding: 60px 40px;
                text-align: center;
                box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
                border-radius: 20px;
            }

            .subscribe-container{
                width: 100%;
                height: 200px;
                position: relative;
                padding-top: 50px;
            }

            .dot{
                width: 60px;
                z-index: 0;
                position: absolute;
                top: 60px;
            }

            .right {
                right: 135px;
                transform: rotate(30deg);
                padding-top: 5px;
            }
            
            .left{
                left: 137px;
                width: 55px;
                transform: rotate(-25deg);
            }
            
            .logo {
                width: 140px;
                height: 140px;
                margin: 0 auto 50px;
                display: block;
            }
            
            h1 {
                font-size: 33px;
                font-weight: 500;
                color: #1a1a1a;
                margin-bottom: 30px;
                line-height: 1.3;
            }
            
            .tagline {
                font-size: 24px;
                color: #1a1a1a;
                margin-bottom: 30px;
                line-height: 1.5;
            }
            
            .description {
                font-size: 22px;
                color: #1a1a1a;
                margin-bottom: 40px;
                line-height: 1.5;
                font-style: italic;
            }
            
            .cta-text {
                font-size: 24px;
                color: #1a1a1a;
                margin-bottom: 20px;
            }
            
            .email-form {
                display: flex;
                align-items: center;
                /*background: rgba(0, 0, 0, 0.08);*/
                background: #E4E0DB;
                border-radius: 30px;
                padding: 5px;
                margin-top: 50px;
                margin-bottom: 50px;
                max-width: 350px;
                margin-left: auto;  
                margin-right: auto;
                position: relative;
                z-index: 10;
            }
            
            .email-input {
                font-family: inherit;
                flex: 1;
                border: none;
                background: transparent;
                padding: 12px 20px;
                font-size: 19px;
                color: #1a1a1a;
                outline: none;
                position: relative;
                z-index: 10;
            }
            
            .email-input::placeholder {
                color: #666;
                transition: color 0.3s ease;
            }
            
            .email-input.error::placeholder {
                color: #e74c3c;
            }
            
            .email-form.shake {
                animation: shake 0.5s ease-in-out;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .submit-button {
                background: #1a1a1a;
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .submit-button:hover {
                background: #333;
                transform: scale(1.1);
            }
            
            .submit-button svg {
                width: 20px;
                height: 20px;
            }
            
            .brand-name {
                font-size: 24px;
                font-weight: 500;
                color: #1a1a1a;
                letter-spacing: -0.5px;
            }

            iframe {
                width:560px;
                height:315px;
            }
                
            @media (max-width: 480px) {
                .container {
                    padding: 40px 25px; /* Slightly less horizontal padding */
                }
                
                h1 {
                    font-size: 33px; /* Was 33px */
                    margin-bottom: 25px; /* Was 30px */
                }
                
                .tagline {
                    font-size: 22px; /* Was 24px */
                    margin-bottom: 25px; /* Was 30px */
                }
                
                .description {
                    font-size: 20px; /* Was 22px - this is the key one! */
                    margin-bottom: 30px; /* Was 40px */
                    line-height: 1.4; /* Slightly tighter */
                }
                
                .cta-text {
                    font-size: 22px; /* Was 24px */
                    margin-bottom: 18px; /* Was 20px */
                }

                .email-form {
                    max-width: 280px;
                    margin-left: auto;  
                    margin-right: auto; 
                }
                
                .email-input {
                    font-size: 18px; /* Was 19px */
                    padding: 10px 16px; /* Slightly smaller */
                }
                
                .brand-name {
                    font-size: 23px; /* Was 24px */
                }
                
                .logo {
                    width: 120px; /* Was 140px */
                    height: 120px;
                    margin: 0 auto 40px; /* Was 50px */
                }

                .dot{
                    width: 50px;
                    top: 60px;
                }

                .right {
                    right: 0px;
                    transform: rotate(25deg);
                    padding-top: 5px;
                }
                
                .left{
                    left: 0px;
                    width: 47px;
                    transform: rotate(-20deg);
                }

                iframe {
                    width:90%;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">

            <iframe src="https://www.youtube.com/embed/videoseries?si=XtaPauo_BvGdhMxA&amp;list=PLepWyRIKbp9HItjh1jjqsMxzSOJDPISuy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            
            <div class="subscribe-container">
                <img src="/img/andy-head-individual.png" alt="Andy Head" class="dot right" />
                <img src="/img/cassie-head-individual.png" alt="Cassie Head" class="dot left" />
                <form class="email-form" id="waitlistForm">
                    <input 
                        type="email" 
                        class="email-input" 
                        placeholder="send-episodes@weekly.plz" 
                        required
                        id="emailInput"
                    >
                    <button type="submit" class="submit-button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </form>
            </div>

            <button>Listen on Spotify</button><br>
            <button>Listen on Apple Podcasts</button><br>
            <button>Listen on YouTube Music</button>
            
        </div>
        
        <script>
            const placeholder_txt = 'learn-more@waitlist.com';
            const form = document.getElementById('waitlistForm');
            const emailInput = document.getElementById('emailInput');

            function showError(message) {
                console.log('[DEBUG] showError called with message:', message);
                emailInput.classList.add('error');
                form.classList.add('shake');
                emailInput.value = '';
                emailInput.placeholder = message;
                
                setTimeout(() => {
                    form.classList.remove('shake');
                }, 500);
                
                setTimeout(() => {
                    emailInput.placeholder = placeholder_txt;
                    emailInput.classList.remove('error');
                }, 3000);
                
                emailInput.focus();
            }
            
            function showSuccess(email) {
                console.log('[DEBUG] showSuccess called with email:', email);
                alert("Thanks for joining! We'll contact " + email + " soon.");
                emailInput.value = '';
                emailInput.placeholder = "You're on the list!";
                
                setTimeout(() => {
                    emailInput.placeholder = placeholder_txt;
                }, 6000);
            }
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('[DEBUG] Form submitted');

                // checking validity - first Get the raw value
                const rawEmail = emailInput.value;
                // Trim whitespace
                const trimmedEmail = rawEmail.trim();
                // Update the input with trimmed value (important!)
                emailInput.value = trimmedEmail;
                // Check if empty after trimming
                if (!trimmedEmail) {
                    showError('Please enter your email');
                    return;
                }
                // Use browser's built-in validation
                if (!emailInput.checkValidity()) {
                    // Get browser's validation message
                    console.log('Browser validation message:', emailInput.validationMessage);
                    showError(emailInput.validationMessage || 'Please enter a valid email');
                    return;
                }
                // Email is valid, proceed with API call
                console.log('Email passed browser validation:', trimmedEmail);
                const email = trimmedEmail;

                console.log('[DEBUG] Email passed all frontend validation, proceeding to API call');
                
                // Success - email submission logic
                try {
                    console.log('[DEBUG] Making API call to /api/waitlist');
                    console.log('[DEBUG] Request body:', JSON.stringify({ email }));

                    // Call our API endpoint
                    const response = await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email })
                    });

                    console.log('[DEBUG] Response status:', response.status);
                    console.log('[DEBUG] Response ok:', response.ok);
                    
                    const result = await response.json();

                    console.log('[DEBUG] Response body:', result);
                    
                    if (response.ok) {
                        console.log('[DEBUG] API call successful');
                        showSuccess(email);
                    } else {
                        console.log('[DEBUG] API call failed with error:', result.error || 'No error message');
                        showError(result.error || 'Something went wrong');
                    }
                    
                } catch (error) {
                    console.log('[DEBUG] Caught error during API call:', error);
                    console.error('Error:', error);
                    showError('Network error. Please try again.');
                } 
            });
            
            // Remove error state when user starts typing
            emailInput.addEventListener('input', () => {
                console.log('[DEBUG] User typing, current value:', emailInput.value);
                emailInput.classList.remove('error');
            });
            
            // Also remove error state when focusing
            emailInput.addEventListener('focus', () => {
                console.log('[DEBUG] Input focused');
                if (emailInput.classList.contains('error') && emailInput.value === '') {
                    console.log('[DEBUG] Clearing error state on focus');
                    emailInput.placeholder = placeholder_txt;
                    emailInput.classList.remove('error');
                }
            });
        </script>
    </body>
    </html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  },
};
