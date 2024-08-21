import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Categories } from '../dto\'s/category.dto';
import { Item } from '../dto\'s/item.dto';
import { Pet } from '../dto\'s/pet.dto';
import { User } from '../dto\'s/user.dto';
import { LoginRequest, LoginResponse } from '../dto\'s/login.dto';
import { signup } from '../dto\'s/signup.dto';
import { ForgetPasswordRequest, ForgetPasswordResponse } from '../dto\'s/forgetpassword.dto';
import { ResetPasswordRequest, ResetPasswordResponse } from '../dto\'s/resetpassword.dto';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private baseURL: string = 'https://localhost:7156/api/User';
  private imageUploadURL: string = 'https://localhost:7156/api/Files/UploadImageAndGetURL';

  // BehaviorSubject to track the authentication status
  private authStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.imageUploadURL, formData, {
        headers: new HttpHeaders({
            'accept': 'text/plain'
        }),
        responseType: 'text' // Tell Angular to treat the response as plain text
    });
}


  // Categories
  GetAllCategories(): Observable<Categories[]> {
    const url = `${this.baseURL}/categories`;
    const headers = this.getHeaders();
    return this.http.get<Categories[]>(url, { headers });
  }

  AddCategory(createCategoryDto: Categories): Observable<Categories> {
    const url = `${this.baseURL}/category`;
    const headers = this.getHeaders();
    return this.http.post<Categories>(url, createCategoryDto, { headers });
  }

  UpdateCategory(id: number, updateCategoryDto: Categories): Observable<Categories> {
    const url = `${this.baseURL}/category/${id}`;
    const headers = this.getHeaders();
    return this.http.put<Categories>(url, updateCategoryDto, { headers });
  }

  DeleteCategory(id: number): Observable<void> {
    const url = `${this.baseURL}/category/${id}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers });
  }

  // Items
  GetAllItems(): Observable<Item[]> {
    const url = `${this.baseURL}/items`;
    const headers = this.getHeaders();
    return this.http.get<Item[]>(url, { headers });
  }

  AddItem(createItemDto: Item): Observable<Item> {
    const url = `${this.baseURL}/item`;
    const headers = this.getHeaders();
    return this.http.post<Item>(url, createItemDto, { headers });
  }

  UpdateItem(id: number, updateItemDto: Item): Observable<Item> {
    const url = `${this.baseURL}/item/${id}`;
    const headers = this.getHeaders();
    return this.http.put<Item>(url, updateItemDto, { headers });
  }

  DeleteItem(id: number): Observable<void> {
    const url = `${this.baseURL}/item/${id}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers });
  }

  // Pets
  GetAllPets(): Observable<Pet[]> {
    const url = `${this.baseURL}/pets`;
    const headers = this.getHeaders();
    return this.http.get<Pet[]>(url, { headers });
  }

  // Users
  GetAllUsers(): Observable<User[]> {
    const url = `${this.baseURL}/users`;
    const headers = this.getHeaders();
    return this.http.get<User[]>(url, { headers });
  }

  // Authentication
  Login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const url = `${this.baseURL}/login`;
    return this.http.post<LoginResponse>(url, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: LoginResponse) => {
        // On successful login, store token and update auth status
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        this.authStatus.next(true);
      })
    );
  }

  SignOut(userId: number): Observable<void> {
    const url = `https://localhost:7156/api/User/logout/${userId}`;
    return this.http.post<void>(url, {}, {
      headers: new HttpHeaders({ 'accept': '*/*' })
    }).pipe(
      tap(() => {
        // On successful sign-out, remove token and update auth status
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.authStatus.next(false);
      })
    );
  }

  Signup(formData: FormData): Observable<void> {
    const url = `${this.baseURL}/user`;
    const headers = new HttpHeaders(); 
    return this.http.post<void>(url, formData, { headers });
  }
  
  ForgetPassword(forgetPasswordRequest: ForgetPasswordRequest): Observable<ForgetPasswordResponse> {
    const url = `${this.baseURL}/ForgotPassword`;
    return this.http.post<ForgetPasswordResponse>(url, forgetPasswordRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  ResetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    const url = `${this.baseURL}/ResetPassword`;
    return this.http.post<ResetPasswordResponse>(url, resetPasswordRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Helper method to get headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${token}`
    });
  }
}
