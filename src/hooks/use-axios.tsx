/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "@/lib/axios";

export function useAxios() {
  const get = useCallback(
    async <T = any,>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return axiosInstance.get<T>(url, config);
    },
    []
  );

  const post = useCallback(
    async <T = any,>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return axiosInstance.post<T>(url, data, config);
    },
    []
  );

  const put = useCallback(
    async <T = any,>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return axiosInstance.put<T>(url, data, config);
    },
    []
  );

  const del = useCallback(
    async <T = any,>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> => {
      return axiosInstance.delete<T>(url, config);
    },
    []
  );

  return { get, post, put, delete: del };
}
