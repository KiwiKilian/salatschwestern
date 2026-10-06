import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";

import { CreateUserDto } from "@/users/dto/create-user.dto";
import { UpdateUserDto } from "@/users/dto/update-user.dto";
import { UsersService } from "@/users/users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: "active", required: false })
  findAll(@Query("active") active?: boolean) {
    return this.usersService.findAll({ active });
  }

  @Get(":id")
  @ApiQuery({ name: "includeSalads", required: false })
  @ApiQuery({ name: "includesUserBalances", required: false })
  findOne(
    @Param("id") id: string,
    @Query("includeSalads") includeSalads?: boolean,
    @Query("includesUserBalances") includesUserBalances?: boolean,
  ) {
    return this.usersService.findOne(id, includeSalads, includesUserBalances);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
