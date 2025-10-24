/**
 * Netlify Function: Health Check
 * 
 * 엔드포인트: /api/health-check
 * 
 * Functions가 정상 동작하는지 확인하는 간단한 헬스체크 엔드포인트
 */

export async function handler(event, context) {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: process.env.HUGO_ENV || 'unknown',
            message: 'Netlify Functions is working!',
        }),
    };
}

