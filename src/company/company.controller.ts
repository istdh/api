import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { HmacguardGuard } from 'src/hmac/hmac-guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { HasRoles } from 'src/auth/decorator/role.decorator';
import { Roles } from 'enum';
import { ContactInfoDTO } from './dto/contact-info.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('by/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  getCompanyById(@Param('id') id: string) {
    return this.companyService.getCompanyById(id);
  }

  @Patch('/edit-logo/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  updateLogo(@Body('logo') logo: string, @Param('id') id: string) {
    return this.companyService.updateLogo(logo, id);
  }

  @Patch('/update-contact/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  updateContactInfo(
    @Body() contactInfoDTO: ContactInfoDTO,
    @Param('id') id: string,
  ) {
    return this.companyService.updateContactInfo(id, contactInfoDTO);
  }
  @Patch('/update-about/:id')
  @UseGuards(HmacguardGuard, AccessTokenGuard, RolesGuard)
  @HasRoles(Roles.EMPLOYEE, Roles.EMPLOYER)
  updateAboutCompany(@Body('about') about: string, @Param('id') id: string) {
    return this.companyService.updateAboutCompany(id, about);
  }

  @Get('/get-top-company')
  @UseGuards(HmacguardGuard)
  getTopCompanies() {
    return this.companyService.getTopCompanies();
  }
}
