import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDTO } from './dto/create-job.dto';
import { generateSlug } from 'utils/generate-slug';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  // async createMany() {
  //   await this.prisma.job.createMany({
  //     data: [
  //       {
  //         title_job: 'Software Engineer',
  //         slug: 'software-engineer',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '25-35',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['JavaScript', 'React', 'Node.js'],
  //         currency: 'USD',
  //         min_salary: 1500,
  //         max_salary: 2500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-01T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in software development',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'social_insurance, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Data Scientist',
  //         slug: 'data-scientist',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '26-40',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'master_degree',
  //         languages: ['english'],
  //         skills: ['Python', 'Machine Learning', 'Data Analysis'],
  //         currency: 'VND',
  //         min_salary: 20000000,
  //         max_salary: 30000000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-05T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '2+ years of experience in data science',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'flexible_working_hours, gym_membership',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Project Manager',
  //         slug: 'project-manager',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '30-45',
  //         experience: '6_to_10_years',
  //         level: 'manager',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Project Management', 'Agile', 'Scrum'],
  //         currency: 'USD',
  //         min_salary: 2000,
  //         max_salary: 3500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-06-30T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '5+ years of experience in project management',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'company_car, annual_bonuses',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Frontend Developer',
  //         slug: 'frontend-developer',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_da_nang'],
  //         gender: ['male', 'female'],
  //         age: '23-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['HTML', 'CSS', 'JavaScript'],
  //         currency: 'USD',
  //         min_salary: 1200,
  //         max_salary: 2000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-10T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in frontend development',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'remote_work, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Backend Developer',
  //         slug: 'backend-developer',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '25-35',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Java', 'Spring', 'SQL'],
  //         currency: 'USD',
  //         min_salary: 1500,
  //         max_salary: 2500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-20T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in backend development',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'annual_leave, public_holidays',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'UX/UI Designer',
  //         slug: 'ux-ui-designer',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '22-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['Figma', 'Sketch', 'Adobe XD'],
  //         currency: 'USD',
  //         min_salary: 1000,
  //         max_salary: 1800,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-25T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in UX/UI design',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'flexible_working_hours, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Quality Assurance Engineer',
  //         slug: 'quality-assurance-engineer',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '24-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Manual Testing', 'Automation Testing', 'SQL'],
  //         currency: 'USD',
  //         min_salary: 1300,
  //         max_salary: 2000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-15T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in QA engineering',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'team_building_activities, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Business Analyst',
  //         slug: 'business-analyst',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '27-40',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['Business Analysis', 'SQL', 'Excel'],
  //         currency: 'USD',
  //         min_salary: 1700,
  //         max_salary: 2500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-08-01T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in business analysis',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'life_insurance, annual_bonuses',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Software Engineer',
  //         slug: 'software-engineer-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '23-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['HTML', 'CSS', 'JavaScript'],
  //         currency: 'USD',
  //         min_salary: 1200,
  //         max_salary: 2000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-10T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in frontend development',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'remote_work, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Backend Developer',
  //         slug: 'backend-developer-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '25-35',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Java', 'Spring', 'SQL'],
  //         currency: 'USD',
  //         min_salary: 1500,
  //         max_salary: 2500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-20T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in backend development',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'annual_leave, public_holidays',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'UX/UI Designer',
  //         slug: 'ux-ui-designer-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '22-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['Figma', 'Sketch', 'Adobe XD'],
  //         currency: 'USD',
  //         min_salary: 1000,
  //         max_salary: 1800,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-25T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in UX/UI design',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'flexible_working_hours, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Quality Assurance Engineer',
  //         slug: 'quality-assurance-engineer-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '24-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Manual Testing', 'Automation Testing', 'SQL'],
  //         currency: 'USD',
  //         min_salary: 1300,
  //         max_salary: 2200,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-07-30T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in QA engineering',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'team_building_activities, health_insurance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Business Analyst',
  //         slug: 'business-analyst-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '27-40',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english'],
  //         skills: ['Business Analysis', 'SQL', 'Excel'],
  //         currency: 'USD',
  //         min_salary: 1700,
  //         max_salary: 2500,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-08-01T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in business analysis',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'life_insurance, annual_bonuses',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'DevOps Engineer',
  //         slug: 'devops-engineer-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ho_chi_minh'],
  //         gender: ['male', 'female'],
  //         age: '25-40',
  //         experience: '3_to_5_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['AWS', 'Docker', 'Kubernetes'],
  //         currency: 'USD',
  //         min_salary: 1800,
  //         max_salary: 3000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-08-10T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 1,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '3+ years of experience in DevOps',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'remote_work, gym_membership',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //       {
  //         title_job: 'Marketing Specialist',
  //         slug: 'marketing-specialist-1',
  //         industry: ['1'],
  //         workplace: ['thanh_pho_ha_noi'],
  //         gender: ['male', 'female'],
  //         age: '24-35',
  //         experience: '1_to_2_years',
  //         level: 'employee',
  //         degree: 'bachelor_degree',
  //         languages: ['english', 'vietnamese'],
  //         skills: ['Digital Marketing', 'SEO', 'Content Creation'],
  //         currency: 'VND',
  //         min_salary: 15000000,
  //         max_salary: 25000000,
  //         hidden_salary: false,
  //         job_type: 'full_time',
  //         deadline: '2024-08-05T00:00:00Z',
  //         description: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'heading',
  //               attrs: {
  //                 textAlign: 'left',
  //                 level: 1,
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet semper erat, sed suscipit nisl.',
  //                 },
  //               ],
  //             },
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'left',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'Phasellus tincidunt sem nec feugiat semper. Donec tincidunt imperdiet pretium. Aliquam at tristique nunc, in suscipit tortor. Curabitur at velit laoreet sapien vulputate molestie. Praesent vehicula rutrum ante, malesuada ultrices mauris elementum quis. Donec semper, velit at feugiat vehicula, turpis felis pellentesque risus, at luctus augue ante ut neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus dolor pharetra lacus efficitur tristique. Vivamus rhoncus tristique accumsan. Nam pellentesque libero ut viverra imperdiet. Mauris malesuada bibendum diam pellentesque auctor. Cras at purus rhoncus, pharetra nibh et, bibendum sapien.',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         priority: 2,
  //         required: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: '1+ years of experience in marketing',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         benefits: JSON.stringify({
  //           type: 'doc',
  //           content: [
  //             {
  //               type: 'paragraph',
  //               attrs: {
  //                 textAlign: 'justify',
  //               },
  //               content: [
  //                 {
  //                   type: 'text',
  //                   text: 'annual_leave, travel_allowance',
  //                 },
  //               ],
  //             },
  //           ],
  //         }),
  //         company_id: 'clx41b82t0000p7if6natzsvs',
  //       },
  //     ],
  //   });
  // }

  async createJob(createJobDTO: CreateJobDTO, company_id: string) {
    const {
      title_job,
      industry,
      workplace,
      gender,
      age,
      experience,
      level,
      skills,
      degree,
      languages,
      currency,
      min_salary,
      max_salary,
      hidden_salary,
      job_type,
      deadline,
      description,
      required,
      benefits,
    } = createJobDTO;

    const slug = generateSlug(title_job);

    const job = await this.prisma.job.create({
      data: {
        title_job,
        industry,
        workplace,
        gender,
        age,
        slug,
        experience,
        level,
        degree,
        languages,
        currency,
        skills,
        min_salary,
        max_salary,
        hidden_salary,
        job_type,
        deadline,
        description,
        required,
        benefits,
        company_id,
        priority: 3,
      },
    });

    return { statusCode: 201, message: 'Created' };
  }

  async updateJob(createJobDTO: CreateJobDTO, id: string) {
    const {
      title_job,
      industry,
      workplace,
      gender,
      age,
      experience,
      level,
      skills,
      degree,
      languages,
      currency,
      min_salary,
      max_salary,
      hidden_salary,
      job_type,
      deadline,
      description,
      required,
      benefits,
    } = createJobDTO;
    const slug = generateSlug(title_job);
    const job = await this.prisma.job.update({
      data: {
        title_job,
        industry,
        workplace,
        gender,
        age,
        experience,
        level,
        slug,
        degree,
        languages,
        currency,
        skills,
        min_salary,
        max_salary,
        hidden_salary,
        job_type,
        deadline,
        description,
        required,
        benefits,
        priority: 3,
      },
      where: { id },
    });

    return { statusCode: 201, message: 'Created' };
  }

  async getJobsByCompany(company_id: string, page: string) {
    const count = await this.prisma.job.count({ where: { company_id } });
    const jobs = await this.prisma.job.findMany({
      where: { company_id },
      skip: (Number(page) - 1) * 10,
      take: 10,
    });

    return { jobs, count };
  }

  async getHotJobs() {
    const hotJobs = await this.prisma.job.findMany({
      where: {
        priority: 3,
        NOT: {
          workplace: {
            hasSome: [
              'germany',
              'uk-en',
              'us-en',
              'japan',
              'korean',
              'australia',
              'canada',
              'taiwan',
            ],
          },
        },
      },
      include: {
        saved_job: true,
        application: true,
        company: {
          select: {
            logo: true,
            name_company: true,
          },
        },
      },
      orderBy: [
        {
          priority: 'desc',
        },
        { created_at: 'desc' },
      ],
    });

    return hotJobs;
  }

  async getInternationalJobs(workplace: string) {
    const listWorkplace = workplace.split(',');
    const jobs = await this.prisma.job.findMany({
      where: {
        workplace: {
          hasSome: listWorkplace,
        },
      },
      include: {
        saved_job: true,
        application: true,
        company: {
          select: {
            logo: true,
            name_company: true,
          },
        },
      },
      orderBy: [
        {
          priority: 'desc',
        },
        { created_at: 'desc' },
      ],
    });

    return jobs;
  }

  async getJobDetail(slug: string) {
    const job = await this.prisma.job.findUnique({
      where: { slug },
      include: {
        application: true,
        company: {
          include: {
            job: {
              where: {
                deadline: {
                  gte: new Date(Date.now()),
                },
              },
              include: {
                application: true,
                company: {
                  select: {
                    logo: true,
                    name_company: true,
                  },
                },
              },
            },
            _count: {
              select: {
                follow: true,
              },
            },
          },
        },
      },
    });

    const relatedJobs = await this.prisma.job.findMany({
      where: {
        AND: [
          { slug: { not: slug } }, // Loại trừ công việc hiện tại
          {
            industry: {
              hasSome: job?.industry,
            },
            workplace: {
              hasSome: job.workplace,
            },
          }, // Dựa trên ngành nghề
        ],
      },

      orderBy: [{ priority: 'desc' }, { created_at: 'desc' }],

      include: {
        company: {
          include: {
            job: true,
          },
        },
      },
      take: 20, // Lấy tối đa 5 công việc liên quan
    });

    return { job, relatedJobs };
  }
  async getJobs(page: string) {
    const count = await this.prisma.job.count();
    const jobs = await this.prisma.job.findMany({
      include: {
        company: {
          select: {
            logo: true,
            name_company: true,
          },
        },
      },
      skip: (Number(page) - 1) * 16,
      take: 16,
      orderBy: [
        {
          priority: 'desc',
        },
        { created_at: 'desc' },
      ],
    });

    return { jobs, count };
  }
}
