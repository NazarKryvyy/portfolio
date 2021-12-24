import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_PORTFOLIOS,
  GET_USER_PORTFOLIOS,
  CREATE_PORTFOLIO,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  SIGN_IN,
  GET_USER,
  SIGN_OUT,
} from "apollo/queries";

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);
export const useGetUserPortfolios = () => useQuery(GET_USER_PORTFOLIOS);
export const useUpdatePortfolio = () => useMutation(UPDATE_PORTFOLIO);
export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      const { userPortfolios } = cache.readQuery({
        query: GET_USER_PORTFOLIOS,
      });
      const newPortfolios = userPortfolios.filter(
        (p) => p._id !== deletePortfolio
      );
      cache.writeQuery({
        query: GET_USER_PORTFOLIOS,
        data: { userPortfolios: newPortfolios },
      });
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      try {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        cache.writeQuery({
          query: GET_PORTFOLIOS,
          data: { portfolios: [...portfolios, createPortfolio] },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

// Auth actions start -----------------------

export const useSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signedInUser } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signedInUser },
      });
    },
  });
export const useSignOut = () => useMutation(SIGN_OUT);
export const useLazyGetUser = () => useLazyQuery(GET_USER);
export const useGetUser = () => useQuery(GET_USER);

// Auth actions end -----------------------
