// app/api/diabetes-screenings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log('🔍 API Route Session Check:', {
      hasSession: !!session,
      hasAccessToken: !!(session as any)?.access_token,
      userId: (session as any)?.user?.id,
      userRole: (session as any)?.user?.role
    });

    if (!session || !(session as any).access_token) {
      console.error('❌ No session or access_token in API route');
      return NextResponse.json({
        meta: {
          status: 'error',
          message: 'Unauthorized - No valid session',
          statusCode: 401,
        },
        data: [],
      }, { status: 401 });
    }

    const baseUrl = process.env.LARAVEL_API_URL || 'http://localhost:8000';
    const userId = (session as any).user?.id;
    const userRole = (session as any).user?.role;
    const accessToken = (session as any).access_token;

    console.log('🔄 Fetching diabetes screenings from Laravel API...');
    console.log('🔍 User ID:', userId);
    console.log('🔍 User Role:', userRole);

    // Choose endpoint based on user role and available data
    let endpoint;
    if (userRole === 'admin') {
      // Admin can access all data
      endpoint = '/api/user-screening-new-admin';
    } else {
      // Regular user - get their own data
      if (userId) {
        endpoint = `/api/user-screening-new/${userId}`;
      } else {
        // Fallback to other endpoints
        endpoint = '/api/screening/diabetes/history';
      }
    }

    const fullUrl = `${baseUrl}${endpoint}`;
    console.log(`🔄 Calling: ${fullUrl}`);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Laravel API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText.substring(0, 500)
      });

      // Try alternative endpoints if primary fails
      if (response.status === 403 || response.status === 404) {
        console.log('🔄 Trying alternative endpoint...');
        
        const alternativeResponse = await fetch(`${baseUrl}/api/screening/diabetes/history`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (alternativeResponse.ok) {
          const alternativeData = await alternativeResponse.json();
          console.log('✅ Alternative endpoint worked');
          return NextResponse.json(alternativeData);
        }
      }

      return NextResponse.json({
        meta: {
          status: 'error',
          message: `Laravel API error: ${response.status} - ${errorText}`,
          statusCode: response.status,
        },
        data: [],
      }, { status: response.status });
    }

    const data = await response.json();
    console.log(`✅ Data received:`, { 
      hasData: !!data,
      hasMeta: !!data.meta,
      dataLength: Array.isArray(data.data) ? data.data.length : 'N/A',
      endpoint: endpoint
    });

    // START OF MODIFIED CODE
    if (data && Array.isArray(data.data)) {
      data.data = data.data.map((item: any) => ({
        ...item,
        // Pastikan patient_name selalu string, dengan fallback yang lebih kuat
        patient_name: item.name || `Pasien ${item.name || item.id || "Tidak Diketahui"}`,
      }))
    }
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('❌ Internal Server Error:', error);
    return NextResponse.json({
      meta: {
        status: 'error',
        message: `Internal Server Error: ${error.message}`,
        statusCode: 500,
      },
      data: [],
    }, { status: 500 });
  }
}