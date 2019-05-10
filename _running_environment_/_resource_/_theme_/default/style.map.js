(function()
{
	return function()
	{
		nexacro._setCSSMaps(
		{
			"body" :
			{
				"parent" :
				{
					"datepicker" :
					{
						"parent" :
						{
							"Calendar" :
							{
								"class" :
								{
									"simple_module" :
									{
										"self" :
										{
											"enabled" :
											{
												"border" : nexacro.BorderObject("1px none transparent")
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"dayitem" :
			{
				"parent" :
				{
					"body" :
					{
						"parent" :
						{
							"datepicker" :
							{
								"parent" :
								{
									"Calendar" :
									{
										"class" :
										{
											"simple_module" :
											{
												"self" :
												{
													"saturday" :
													{
														"color" : nexacro.ColorObject("#333333")
													},
													"sunday" :
													{
														"color" : nexacro.ColorObject("#333333")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			"weekitem" :
			{
				"parent" :
				{
					"body" :
					{
						"parent" :
						{
							"datepicker" :
							{
								"parent" :
								{
									"Calendar" :
									{
										"class" :
										{
											"simple_module" :
											{
												"self" :
												{
													"saturday" :
													{
														"color" : nexacro.ColorObject("#ffffff")
													},
													"sunday" :
													{
														"color" : nexacro.ColorObject("#ffffff")
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		{
			"includeStatusMap" : true
		}
		);

		var imgcache = nexacro._getImageCacheMaps();
		
	};
}
)();
