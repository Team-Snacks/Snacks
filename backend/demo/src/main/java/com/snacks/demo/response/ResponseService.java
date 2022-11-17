package com.snacks.demo.response;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseService {
    //반환할 데이터가 없을 때
    public CommonResponse getCommonResponse(int status) {
        CommonResponse commonResponse = new CommonResponse();
        setSuccessResponse(commonResponse, status);

        return (commonResponse);
    }

    //반환할 데이터가 1개 일 떄
    public<T> SingleResponse<T> getSingleResponse(T data, int status) {
        SingleResponse singleResponse = new SingleResponse();
        singleResponse.data = data;
        setSuccessResponse(singleResponse, status);


        return (singleResponse);
    }

    //반환할 데이터가 여러개 일 때
    public<T> ListResponse<T> getListResponse(T datalist, int status) {
        ListResponse<T> listResponse = new ListResponse();
        listResponse.dataList = datalist;
        setSuccessResponse(listResponse, status);
        return (listResponse);
    }

    //오류를 반환할때
    public CommonResponse errorResponse(int status, String log)
    {
        CommonResponse errorResponse = new CommonResponse();
        errorResponse.status = status;
        errorResponse.log = log;

        return (errorResponse);
    }
    //CommonResponse의 값을 성공으로 변환
    void setSuccessResponse(CommonResponse response, int status) {
        response.status = status;
        response.log = "OK";
    }
}
