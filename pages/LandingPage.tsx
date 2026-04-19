import React, { useState, useEffect } from 'react';
import { Users, Briefcase, GraduationCap, Building2, Calendar, Bell, ArrowRight, CheckCircle, Phone, Mail, MapPin, Printer } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Notice, Event } from '../types';

export const LandingPage: React.FC = () => {
    const [latestNotice, setLatestNotice] = useState<Notice | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // Load latest notice
            const notices = await StorageService.getActiveNotices();
            if (notices.length > 0) {
                setLatestNotice(notices[0]); // Most recent
            }

            // Load upcoming events (max 3)
            const events = await StorageService.getActiveEvents();
            setUpcomingEvents(events.slice(0, 3));
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Hero Section - AUC Style with Full-Width Background */}
            <section className="relative h-[600px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/nfsu-building.jpg)' }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                                Welcome to<br />
                                the Career Center
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl">
                                The National Forensic Sciences University's Career Center is a pioneer in the region in the area of university career education, employer relations and recruitment.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section - AUC Style Navigation (2 columns) */}
            <section className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {/* Students */}
                        <a href="/login" className="group py-8 px-6 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-start">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                    <GraduationCap className="text-blue-600" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Students</h3>
                                <p className="text-sm text-gray-600 mb-4">Access placement opportunities and career resources</p>
                                <span className="text-sm font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Learn More <ArrowRight size={16} />
                                </span>
                            </div>
                        </a>

                        {/* Employers */}
                        <a href="/recruiter-login" className="group py-8 px-6 hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col items-start">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                    <Building2 className="text-purple-600" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Employers</h3>
                                <p className="text-sm text-gray-600 mb-4">Recruit top forensic science talent</p>
                                <span className="text-sm font-semibold text-purple-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Learn More <ArrowRight size={16} />
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Updates Section - Clean Layout */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Latest Notice */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                                <div className="flex items-center gap-3 text-white">
                                    <Bell size={24} />
                                    <h2 className="text-2xl font-bold">Latest Notice</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                {latestNotice ? (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{latestNotice.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">{latestNotice.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar size={16} />
                                            <span>Posted on {new Date(latestNotice.postedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500 italic">No notices posted yet. Check back later for updates!</p>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
                                <div className="flex items-center gap-3 text-white">
                                    <Calendar size={24} />
                                    <h2 className="text-2xl font-bold">Upcoming Events</h2>
                                </div>
                            </div>
                            <div className="p-8">
                                {upcomingEvents.length > 0 ? (
                                    <div className="space-y-6">
                                        {upcomingEvents.map(event => (
                                            <div key={event.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex flex-col items-center justify-center border border-gray-200">
                                                    <span className="text-xs font-semibold text-gray-500 uppercase">{event.month}</span>
                                                    <span className="text-2xl font-bold text-gray-900">{event.day}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                                                    <p className="text-sm text-gray-600">{event.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No upcoming events scheduled. Stay tuned!</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Information Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Important Information</h2>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Official Email Required</h3>
                                        <p className="text-gray-700">Register using your official NFSU email ID only. Personal email addresses will not be accepted.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Resume Format</h3>
                                        <p className="text-gray-700">Upload your resume in PDF format only. Maximum file size is 2MB.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-2">Admin Verification</h3>
                                        <p className="text-gray-700">Wait for admin verification before applying to placement drives. You will be notified via email once verified.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Contact Us</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Professor In Charge */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Professor In Charge</h3>
                            <div className="flex gap-6">
                                {/* Profile Placeholder */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                        <Users className="text-blue-600" size={40} />
                                    </div>
                                </div>
                                {/* Details */}
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Prof. [Name]</h4>
                                    <p className="text-sm text-gray-600 mb-4">Department of Forensic Science</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>+91 XX XXXXXXXX</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>pic.placement@nfsu.ac.in</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Co Professor In Charge */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Co Professor In Charge</h3>
                            <div className="flex gap-6">
                                {/* Profile Placeholder */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                        <Users className="text-green-600" size={40} />
                                    </div>
                                </div>
                                {/* Details */}
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Prof. [Name]</h4>
                                    <p className="text-sm text-gray-600 mb-4">Department of Forensic Science</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Phone size={16} className="text-gray-400" />
                                            <span>+91 XX XXXXXXXX</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Mail size={16} className="text-gray-400" />
                                            <span>cpic.placement@nfsu.ac.in</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Placement Office */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Placement Office</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-700">National Forensic Sciences University</p>
                                        <p className="text-sm text-gray-700">Dharwad Campus, Karnataka - 580007, India</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Phone size={20} className="text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">+91 XXXXX XXXXX / +91 XXXXX XXXXX</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Printer size={20} className="text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">+91 XX XXXXXXXX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};