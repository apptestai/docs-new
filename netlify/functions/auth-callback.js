/**
 * Netlify Function: OAuth Callback Handler
 * 
 * 엔드포인트: /api/oauth-callback
 * 
 * 환경변수 필요:
 * - TOKEN_URL: OAuth 토큰 교환 엔드포인트
 * - CLIENT_ID: OAuth 클라이언트 ID
 * - CLIENT_SECRET: OAuth 클라이언트 시크릿
 * - REDIRECT_URI: OAuth 리다이렉트 URI
 * 
 * 사용 예시:
 * https://your-site.netlify.app/api/oauth-callback?code=AUTH_CODE
 */

exports.handler = async function (event, context) {
    // CORS 프리플라이트 처리
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        };
    }

    try {
        // URL 파라미터에서 인증 코드 추출
        const code = event.queryStringParameters?.code;
        const state = event.queryStringParameters?.state;

        if (!code) {
            return {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Missing authorization code' }),
            };
        }

        // 환경변수 검증
        const { TOKEN_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

        if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
            console.error('Missing required environment variables');
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Server configuration error' }),
            };
        }

        // OAuth 토큰 교환 (서버에서 수행 - 클라이언트 시크릿 노출 방지)
        const tokenResponse = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            console.error('Token exchange failed:', errorText);
            return {
                statusCode: 500,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ error: 'Token exchange failed' }),
            };
        }

        const data = await tokenResponse.json();
        // 프로덕션 환경에서는 토큰 전체를 로깅하지 않음
        console.log('Token exchange successful');

        // 성공 시 프론트엔드로 리다이렉트
        let redirectUrl = '/success?ok=1';
        if (state) {
            redirectUrl += `&state=${encodeURIComponent(state)}`;
        }

        return {
            statusCode: 302,
            headers: {
                Location: redirectUrl,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        };

    } catch (error) {
        console.error('OAuth callback error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};

