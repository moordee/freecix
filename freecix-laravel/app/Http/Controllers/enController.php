<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class enController extends Controller
{
    public function home()
    {
        return view('home');
    }

    public function searchResults()
    {
        return view('searchResults');
    }

    public function onlineCourses() {
        return view('onlineCourses');
    }

    public function aboutUs() {
        return view('aboutUs');
    }

    public function supportUs() {
        return view('supportUs');
    }

    public function privacyPolicy(){
        return view('privacyPolicy');
    }

    public function communityGuide(){
        return view('communityGuidelines');
    }

    public function useTransparency(){
        return view('useTransparency');
    }

    public function updates(){
        return view('UpdateLogs');
    }
}
