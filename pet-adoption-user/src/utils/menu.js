
const menu = {
	list() {
		return [
			{
				"backMenu":[
					{
						"child":[
							{
								"buttons":[
									"查看",
									"新增",
									"修改",
									"删除"
								],
								"menu":"管理员信息",
								"menuJump":"列表",
								"tableName":"admin/list"
							}
						],
						"menu":"管理员管理"
					},
				{
					"child":[
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"用户信息",
							"menuJump":"列表",
							"tableName":"user/list"
						}
					],
					"menu":"用户管理"
				},
				{
					"child":[
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"领养列表",
							"menuJump":"列表",
							"tableName":"adoption/list"
						},
						{
							"buttons":[
								"新增",
								"查看",
								"审核",
								"删除"
							],
							"menu":"领养审核",
							"menuJump":"列表",
							"tableName":"adoption/approval"
						},
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"宠物类型",
							"menuJump":"列表",
							"tableName":"adoption/petType"
						}
					],
					"menu":"宠物领养管理"
				},
				{
					"child":[
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"知识列表",
							"menuJump":"列表",
							"tableName":"knowledge/list"
						},
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"知识类型",
							"menuJump":"列表",
							"tableName":"knowledge/type/list"
						},
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"知识互动列表",
							"menuJump":"列表",
							"tableName":"knowledge/interactions/list"
						},
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"知识留言列表",
							"menuJump":"列表",
							"tableName":"knowledge/comment/list"
						}
					],
					"menu":"知识管理"
				},
				{
					"child":[
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"公告列表",
							"menuJump":"列表",
							"tableName":"news/list"
						},
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"公告分类",
							"menuJump":"列表",
							"tableName":"news/type"
						},
					],
					"menu":"公告管理"
				},
				{
					"child":[
						{
							"buttons":[
								"查看",
								"新增",
								"修改",
								"删除"
							],
							"menu":"轮播图信息",
							"menuJump":"列表",
							"tableName":"carousel/list"
						},
					],
					"menu":"系统管理"
				},



















				// 			{
				// 					"child":[
				// 							{
				// 									"buttons":[
				// 											"查看",
				// 											"新增",
				// 											"修改",
				// 											"删除"
				// 									],
				// 									"menu":"教学视频管理",
				// 									"menuJump":"列表",
				// 									"tableName":"jiaoxueshipin"
				// 							}
				// 							,
				// 							{
				// 									"buttons":[
				// 											"查看",
				// 											"修改",
				// 											"删除"
				// 									],
				// 									"menu":"教学视频留言管理",
				// 									"menuJump":"列表",
				// 									"tableName":"jiaoxueshipinLiuyan"
				// 							}
				// 							,
				// 							{
				// 									"buttons":[
				// 											"查看",
				// 											"删除"
				// 									],
				// 									"menu":"教学视频收藏管理",
				// 									"menuJump":"列表",
				// 									"tableName":"jiaoxueshipinCollection"
				// 							}
				// 					],
				// 					"menu":"教学视频管理"
				// 			}
				// ,{
				// 		"child":[
				// 				{
				// 						"buttons":[
				// 								"查看",
				// 								"新增",
				// 								"修改",
				// 								"删除"
				// 						],
				// 						"menu":"感谢信管理",
				// 						"menuJump":"列表",
				// 						"tableName":"ganxiexin"
				// 				}
				// 		],
				// 		"menu":"感谢信管理"
				// }
				// ,{
				// 		"child":[
				// 				{
				// 						"buttons":[
				// 								"查看",
				// 								"新增",
				// 								"修改",
				// 								"删除"
				// 						],
				// 						"menu":"宠物类型管理",
				// 						"menuJump":"列表",
				// 						"tableName":"dictionaryChongwulingyang"
				// 				}
				// 				,
				// 				{
				// 						"buttons":[
				// 								"查看",
				// 								"新增",
				// 								"修改",
				// 								"删除"
				// 						],
				// 						"menu":"视频类型管理",
				// 						"menuJump":"列表",
				// 						"tableName":"dictionaryJiaoxueshipin"
				// 				}
				// 				,
							
				
				// 		],
				// 		"menu":"基础数据管理"
				// }
				// 			,{
				// 					"child":[
				// 							{
				// 									"buttons":[
				// 											"查看",
				// 											"新增",
				// 											"修改",
				// 											"删除"
				// 									],
				// 									"menu":"公告管理",
				// 									"menuJump":"列表",
				// 									"tableName":"news"
				// 							}
				// 					],
				// 					"menu":"公告管理"
				// 			}
				// 			,{
				// 					"child":[
				// 							{
				// 									"buttons":[
				// 											"查看",
				// 											"新增",
				// 											"修改",
				// 											"删除"
				// 									],
				// 									"menu":"轮播图管理",
				// 									"menuJump":"列表",
				// 									"tableName":"config"
				// 							}
				// 					],
				// 					"menu":"轮播图信息"
				// 			}
					],
					"frontMenu":[],
					"hasBackLogin":"是",
					"hasBackRegister":"否",
					"hasFrontLogin":"否",
					"hasFrontRegister":"否",
					"roleName":"管理员",
					"tableName":"admin"
			},
			{
					"backMenu":[
						{
							"child":[
								{
									"buttons":[
										"查看",
									],
									"menu":"领养审核",
									"menuJump":"列表",
									"tableName":"adoption/approval"
								},
							],
							"menu":"宠物领养管理"
						},

						{
							"child":[
								{
									"buttons":[
										"查看",
									],
									"menu":"知识列表",
									"menuJump":"列表",
									"tableName":"knowledge/list"
								},
								
								{
									"buttons":[
										"查看",
										"新增",
										"删除"
									],
									"menu":"知识互动列表",
									"menuJump":"列表",
									"tableName":"knowledge/interactions/list"
								},
								{
									"buttons":[
										"查看",
										"新增",
									],
									"menu":"知识留言列表",
									"menuJump":"列表",
									"tableName":"knowledge/comment/list"
								}
							],
							"menu":"知识管理"
						},
						
					
						
					],
					"frontMenu":[],
					"hasBackLogin":"是",
					"hasBackRegister":"否",
					"hasFrontLogin":"否",
					"hasFrontRegister":"否",
					"roleName":"用户",
					"tableName":"user"
			}
		]
	}
}
export default menu;
